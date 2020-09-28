import React, { useMemo } from "react";
import { Pagination } from "react-bootstrap";

const NaviGator = (props) => {
const { BaseUrl, size, page, search, totalCount } = props.controls;
const sz = parseInt(size);
const pg = parseInt(page);
const tc = parseInt(totalCount);

const last = tc %  sz > 0 ? Math.floor(tc / sz) : Math.floor(tc / sz - 1);
const prev = pg > 0 ? pg - 1 : pg;
const next = pg < last ? pg + 1 : pg;

const navi = useMemo( () => 
  ({
    first: BaseUrl + size + "/" + 0 + "/" + search,
    prev: BaseUrl +  size + "/" + prev+ "/" + search,
    info: "Page " + (pg + 1) + " of " + (last + 1),
    next: BaseUrl + size + "/" + next+ "/" + search,
    last: BaseUrl + size + "/" + last+ "/" + search
  }), [BaseUrl, last, next, pg, prev, search, size]);

return(
    <Pagination>
      <Pagination.First disabled={pg===0} href={navi.first} />
      <Pagination.Prev  disabled={pg===0}  href={navi.prev} />
      <Pagination.Item  disabled={true} >{navi.info}</Pagination.Item>
      <Pagination.Next  disabled={pg===last}  href={navi.next} />
      <Pagination.Last  disabled={pg===last} href={navi.last} />
    </Pagination>
  );
};

export default NaviGator;