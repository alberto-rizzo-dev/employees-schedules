export const dateToString = (date: Date) => {
  const hours = date.getHours() <10 ? "0"+date.getHours() : date.getHours();
  const min = date.getMinutes() <10 ? "0"+date.getMinutes() : date.getMinutes();

  return date.toDateString() + " " + hours + ":" + min;
}

export const shiftDuration = (start: Date, end: Date) => {
  //Math.abs not really needed, but just in case (start < end)
  let diff = Math.abs(end.valueOf() - start.valueOf());

  let hours = Math.floor(diff/1000/60/60);
  let mins = Math.floor((diff/1000/60) % 60);

  let m = mins < 10 ? "0"+mins : mins;
  let h = hours < 10 ? "0"+hours : mins;

  return h + ":" + m;
}

export const dateOrderOk = (start: Date, end: Date) => {
  return 0<=(end.valueOf() - start.valueOf());
}

export const durationShiftOk = (start: Date, end: Date) => {
  let diff = end.valueOf() - start.valueOf();
  return Math.floor(diff/1000/60/60) <=10
}

export const atLeastQuarter = (start: Date, end: Date) => {
  //Math.abs not really needed, but just in case (start < end)
  let diff = Math.abs(end.valueOf() - start.valueOf());
  if((Math.floor(diff/1000/60/60))>=1) return true;
  let mins = Math.floor((diff/1000/60) % 60);
  return mins >= 15;
}


export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages - 1, totalPages];
    }
  
    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
      return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
  
    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };