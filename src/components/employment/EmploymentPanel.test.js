import { render } from "@testing-library/react";
import EmploymentPanel from "./EmploymentPanel";
import { waitFor } from "@testing-library/dom";
import { useAuth } from "../../services/useAuth";


const mockAuth = {
    _user: null,
    _jwt: null,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    get user() { return this._user; },
    get jwt() { return this._jwt; }
};

jest.mock("../../services/useAuth", () => ({
    useAuth: () => mockAuth
}));

// TODO Component which uses useAuth()!

describe("EmploymentPanel unit tests", () => {

    it('should render without crashing', () => {
        render(<EmploymentPanel />);
    });

    it('should accept a valid set of employments as a parameter, loading properly', async () => {
        // given:
        // - profile supplied w/ list of employment entries
        const employments = [
            {
                id: 1,
                // TODO Populate employment object!
            },
            {
                id: 2,
                // TODO Populate other employment object!
            }
        ];

        const profile = {
            id: 1,
            employments: employments
        };

        // - profile is editable by currently-authenticated user
        mockAuth._user = {
            id: 1,
            // TODO Populate other user object!
            profile: profile
        };
        mockAuth._jwt = "DUMMY";

        // - we can track when the employments set changes
        /*
        let newEmployments;
        const onEmploymentsChanged = (employments) => {
            console.log("Change event emitted");
            newEmployments = employments;
        };
        */
        const onEmploymentsChanged = (employments) => {
            fail("Change event should not be called!");
        };

        // when:
        // - employment panel is rendered
        const component = render(<EmploymentPanel 
            employments={employments} 
            onChange={onEmploymentsChanged} />);

        // then:
        // - employment list should be populated with 2 Employment objects
        await waitFor(() => component.findAllByTestId(/employment-item/i));

        // - they should each be visible on the page
        expect(component.getByTestId("employment-item-1")).toBeInTheDocument();
        expect(component.getByTestId("employment-item-2")).toBeInTheDocument();

        // - the add/remove buttons are visible (since editable)
        expect(component.getByTestId("add-employment-button")).toBeInTheDocument();
        expect(component.getByTestId("remove-employment-button-1")).toBeInTheDocument();
        expect(component.getByTestId("edit-employment-button-1")).toBeInTheDocument();
        expect(component.getByTestId("remove-employment-button-2")).toBeInTheDocument();

        // - 
    });

    it('should render an empty panel if no profile is provided', () => {

    });

    it('should add an employment entry and sync, if editable', () => {

    });

    it('should remove an employment entry and sync, if editable', () => {

    });

    it('should edit an employment entry and sync, if editable', () => {

    });

    it('should fail to add an employment entry when not editable', () => {

    });

    it('should fail to remove an employment entry when not editable', () => {

    });

    it('should fail to update an employment entry when not editable', () => {

    });
});