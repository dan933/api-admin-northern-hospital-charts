module.exports.getPagination = (page, size) => {
    const limit = size >= 1 ? +size : 3;    
    const offset = page >= 0 ? page * limit : 0;
  
    return { limit, offset };
  };

  module.exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: patients } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, patients, totalPages, currentPage };
  };

  module.exports.getAnxietyData = (data, page, limit) => {
    const { count: totalItems, rows: anxiety } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, anxiety, totalPages, currentPage };
  };