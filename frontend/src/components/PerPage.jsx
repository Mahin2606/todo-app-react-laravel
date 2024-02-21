import React from 'react';

function PerPage({perPage, currentPage, total = null, setPerPage}) {
    return (
        <div className="d-flex">
            {total && <span className='ml-3 mt-1'>
                Showing {((currentPage - 1) * perPage) + 1} to {total > currentPage * perPage ? currentPage * perPage : total } of {total} entries
            </span>}
            {!total && <span className='ml-3 mt-1'>
                Showing {((currentPage - 1) * perPage) + 1} to { currentPage * perPage } entries
            </span>}
        </div>
    );
}

export default PerPage;
