"use client";

import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  count: number;
  pageSize: number;
  defaultPageNumber: number;
  onChangePageNumber: (pageNumber: number) => void;
}

export const PaginationButtons = ({
  count,
  pageSize,
  defaultPageNumber,
  onChangePageNumber,
}: Props) => {
  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      defaultPage={defaultPageNumber}
      onPageChange={(e) => onChangePageNumber(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};
