import { Pagination } from "react-bootstrap"

interface IProps {
    currentPage: number;
    totalPages: number;

    onChangePage: (nextPage: number) => {};
}

export const AppPagination = (props: IProps): JSX.Element => {
    let _hasPreviousPage = props.currentPage > 1;
    let _hasNextPage = props.currentPage < props.totalPages;

    function handleChangePage(nextPage: number){
        if(props.onChangePage && nextPage > 0 && nextPage < props.totalPages){
            props.onChangePage(nextPage);
        }
    }

    return(        
        <Pagination>
            { _hasPreviousPage && <Pagination.Prev onClick={() => handleChangePage(props.currentPage - 1)}/> }            
            { props.currentPage - 2 >= props.totalPages && <Pagination.Item onClick={() => handleChangePage(props.currentPage - 2)}>{ props.currentPage - 2 }</Pagination.Item> }
            { props.currentPage - 1 >= props.totalPages && <Pagination.Item onClick={() => handleChangePage(props.currentPage - 1)}>{ props.currentPage - 1 }</Pagination.Item> }
            <Pagination.Item active>{ props.currentPage }</Pagination.Item>
            { props.currentPage + 1 <= props.totalPages && <Pagination.Item onClick={() => handleChangePage(props.currentPage + 1)}>{ props.currentPage + 1 }</Pagination.Item> }
            { props.currentPage + 2 <= props.totalPages && <Pagination.Item onClick={() => handleChangePage(props.currentPage + 2)}>{ props.currentPage + 2 }</Pagination.Item> }
            { _hasNextPage && <Pagination.Last onClick={() => handleChangePage(props.currentPage + 1)}/> }
        </Pagination>
    )
}