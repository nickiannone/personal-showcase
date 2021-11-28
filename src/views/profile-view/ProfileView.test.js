import { render, screen } from '@testing-library/react';
import ProfileView from './ProfileView';

describe('Profile View unit tests', () => {

    it('should render without crashing', () => {
        render(<ProfileView />);
    });

    it('should display the profile\'s display name, subtitle, and overview', async () => {
        // given
        // - a profile is loaded
        const profile = {
            id: 1,
            display_name: "Nicholas Iannone",
            subtitle: "Software Engineer in Glendale, WI",
            overview: "Testing update!",
            email_address: "test@example.com",
            phone: "123-456-7890",
            user: 1
        };

        // when
        // - the component is initialized
        render(<ProfileView profile={profile} />);

        // then
        // - the display name is shown
        expect(screen.getByTestId("display-name").innerHTML).toContain("Nicholas Iannone");

        // - the subtitle is shown
        expect(screen.getByTestId("subtitle").innerHTML).toContain("Software Engineer");

        // - the email address is shown
        expect(screen.getByTestId("email-address").innerHTML).toContain("test@example.com");

        // - the phone number is shown
        expect(screen.getByTestId("phone").innerHTML).toContain("123-456-7890");

        // - the overview is shown (by default)
        // TODO Remove this and put it in a different test!
        expect(screen.getByTestId("overview").innerHTML).toContain("Testing update!");
    });

    it('should have a link to the edit page, if authenticated as the profile\'s owner', () => {
        // given
        // - a profile is loaded
        // - a user is logged in
        // - the current user matches the user identifier in the profile

        // when
        // - the component is initialized

        // then
        // - the edit link should be available
    });

    it('should NOT have a link to the edit page, if not authenticated as the profile\' owner', () => {
        // given
        // - a profile is loaded
        // - a user is logged in (or not?)
        // - the current user does NOT match the user identifier in the profile

        // when
        // - the components is initialized

        // then
        // - the edit link should NOT be available

    });

    it('should contain tabs for the sub-pages', () => {
        // given
        // - a profile is loaded
        // - a user is logged in
        
        // when
        // - the component is initialized

        // then
        // - the tab container should appear
        // - the Overview tab should be selected by default
    });
});