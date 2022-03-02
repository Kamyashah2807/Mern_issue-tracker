import React from 'react'
import { Link } from 'react-router-dom'

const Issue = ({ issue }) => {
    return (
        <Link className='issueCard' to={`/issue/${issue._id}`}>
            <img src={issue.image} key={issue._id} alt={issue.title} />
            <h4>Title:{issue.title}</h4>
            <h4>Description:<p>{issue.description}</p></h4>
            <h4>Status:{issue.status}
            </h4>
        </Link>
    )
}

export default Issue