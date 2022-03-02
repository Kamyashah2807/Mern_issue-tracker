import React, { Fragment, useEffect, useState } from 'react'
import './Issues.css';
import { useSelector, useDispatch } from 'react-redux';
import { getIssue, clearErrors } from '../../actions/issueAction';
import Issue from '../Home/Issue';
import Pagination from 'react-js-pagination';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';

const Status = [
    "Open",
    "Processing",
    "In Review",
    "Completed"
]

const Issues = () => {
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();

    const { issues, issueCount, resultPerPage, error } = useSelector(state => state.issues);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getIssue(currentPage, status));
    }, [dispatch, currentPage, status, alert, error]);

    return (
        <Fragment>
            <MetaData title="ISSUES - ECOMMERCE" />
            <h2 className='issueHeading'>Issues</h2>
            <div className='issues'>
                {issues && issues.map((issue) => (
                    <Issue key={issue._id} issue={issue} />
                ))}
            </div>

            <div className='filterBox'>
                <Typography>Filter By Status:</Typography>
                <ul className='categoryBox'>
                    {Status.map((stat) => (
                        <li
                            className='category-link'
                            key={stat}
                            onClick={() => setStatus(stat)}
                        >
                            {stat}
                        </li>
                    ))}
                </ul>

            </div>

            {resultPerPage < issueCount && (
                <div className='paginationBox'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={issueCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>
            )}

        </Fragment>
    )
}

export default Issues