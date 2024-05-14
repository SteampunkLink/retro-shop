import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface IPaginateProps {
  pages: number;
  page: number;
  isAdmin: boolean;
  keyword?: string;
}

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword,
}: IPaginateProps) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <LinkContainer
            key={p + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${p + 1}`
                  : `/page/${p + 1}`
                : `/admin/productlist/${p + 1}`
            }
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
