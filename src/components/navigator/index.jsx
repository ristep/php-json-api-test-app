import React, { memo } from "react";
import { Pagination } from "react-bootstrap";

const NaviGator = (props) => {
const { BaseUrl, size, page, search, totalCount } = props.controls;

const last = totalCount %  size > 0 ? Math.floor(totalCount /  size) : Math.floor(totalCount /  size - 1);
const prev = parseInt( page) > 0 ? parseInt( page) - 1 : parseInt( page);
const next = parseInt( page) < last ? parseInt( page) + 1 : parseInt( page);

const navi = {
    first: BaseUrl + size + "/" + 0 + "/" + search,
    prev: BaseUrl +  size + "/" + prev+ "/" + search,
    info: "Page " + (parseInt( page ) + 1) + " of " + (last + 1),
    next: BaseUrl + size + "/" + next+ "/" + search,
    last: BaseUrl + size + "/" + last+ "/" + search
  };

return(
    <Pagination>
      <Pagination.First disabled={page==0} href={navi.first} />
      <Pagination.Prev  disabled={page==0}  href={navi.prev} />
      <Pagination.Item  disabled={true} >{navi.info}</Pagination.Item>
      <Pagination.Next  disabled={page==last}  href={navi.next} />
      <Pagination.Last  disabled={page==last} href={navi.last} />
    </Pagination>
  );
};

export default NaviGator;