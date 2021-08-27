https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
module.exports.getPagination = (page, size) => {
    const limit = size >= 1 ? +size : 10;    
    const offset = page >= 0 ? page * limit : 0;
  
    return { limit, offset };
  };

  module.exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, rows, totalPages, currentPage };
  };