import { useState } from "react";

function Employment(props) {
    const [employment, setEmployment] = useState(props.employment);
    const editable = props.editable;

    // TODO Switch this to use Card controls from MUI!
    return (
        <div className="employment" data-testid={"employment-item-" + employment.id}>
            <h1>{employment.job_title}</h1>
            <p><b>{employment.company_name}</b> - {employment.location}</p>
            <p>{employment.start_date} through {employment.end_date || "current"}</p>
            {
                // TODO Finish!
                editable && (
                    <div className="employment-controls"> 
                        <Button onClick={openEditablePanel} data-testid={"edit-employment-" + employment.id}>
                            Edit
                        </Button>
                        <Button onClick={promptDelete} data-testid={"delete-employment-" + employment.id}>
                            Delete
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default Employment;