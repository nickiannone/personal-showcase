import { useState } from "react";
import { Button } from "@mui/material";
import Employment from "./Employment";
import { employmentService } from "../../services/employmentService";

const EmploymentPanel = (props) => {
    const [employments, setEmployments] = useState(props.employments || []);
    const editable = props.editable;

    const emitChange = () => {
        if (!!props.onChange) {
            console.log("Employments changed: " + JSON.stringify(employments));
            props.onChange(employments);
        }
    };

    const onEmploymentChanged = (employment) => {
        // Update the employment list with the modified employment object
        setEmployments(employments.map(e => {
            return (e.id === employment.id) ? employment : e;
        }));

        // Fire the change handler to update the profile
        emitChange();
    };

    const onEmploymentDeleted = (employment) => {
        // Update the employment list to remove the deleted employment object
        setEmployments(employments.filter(e => e.id === employment.id));

        // Fire the change handler to update the profile
        emitChange();
    };

    const addEmployment = () => {
        // Create a new employment object
        const newEmployment = employmentService.createEmployment({
            job_title: "",
            start_date: null,
            end_date: null,
        });

        if (newEmployment) {
            // Set the employments list
            setEmployments([ ...employments, newEmployment ]);

            // Fire the change handler to update the profile
            props.onChange(employments);
        }
    };

    return (
        <div className="employment-panel">
            <div className="employments-list">
            {
                employments.map((employment) => (
                    <Employment employment={employment} 
                        key={employment.id} 
                        editable={editable}
                        onChange={onEmploymentChanged} 
                        onDelete={onEmploymentDeleted} />
                ))
            }
            </div>
            {
                editable && (
                    <Button type="submit" data-testid="add-employment" onClick={addEmployment}>
                        Add Employment
                    </Button>
                )
            }
        </div>
    );
};

export default EmploymentPanel;