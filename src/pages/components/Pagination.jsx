import "./Pagination.css";
export default function Pagination ({page, setPage}) {
    return (
        <div >
            <button className="pagination_btn"
            disabled={page===1}
            onClick = {()=> setPage(page-1)}>
                Назад
            </button>
            
            <span>  Страница {page}  </span>

            <button className="pagination_btn" onClick ={()=> setPage(page+1)}>
                Вперед
            </button>
        </div>
    );
}