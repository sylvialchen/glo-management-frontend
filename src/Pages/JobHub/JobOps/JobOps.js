import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import JobModal from "../JobModal/JobModal";

const JobOps = ({ jobsList, getJobsList }) => {
    let date = new Date()
    let today = date.getTime()

    useEffect(() => {
        getJobsList()
    }, [])

    const loaded = () => {
        let allJobs = jobsList.map((job, index) => {
            let deleteDate = Date.parse(job.pub_date)+(30*86400000)
            if (today < deleteDate) {
                return (
                    <div style={{ backgroundColor: 'orange' }} key={job.id} data-bs-toggle="modal" data-bs-target={"#jobModal"+job.id}>
                        <div style={{ marginBottom: 10 }}>
                            {job.job_title_txt} - {job.company_name_txt} - {job.level_of_opening_txt} - {job.city_txt}, {job.state_txt}
                            <JobModal post={job} postIdx={index} />
                        </div>
                    </div>
                )
            }
        })

        return (
            <div>
                {allJobs}
            </div>
        )
    }

    const loading = () => {
        return (
            <div>
                There are no jobs..
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-9 text-start">
                    <h3>Job Opportunities</h3>
                </div>
                <div className="col text-end">
                    <Link to={"/jobhub/add"}>Add a Job</Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="text-start overflow-auto" style={{height: 30 +"vh"}}>
                        {jobsList ? loaded() : loading()}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div>
                        <p>
                            {/* See all job Opportunities */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobOps;