const getPaginatedItems = (page, limit, items) => {
    const offset = (page - 1) * limit;
    const pagedItems = drop(offset, items).slice(0, limit);
  
    return {
      totalPages: Math.ceil(items.length / limit),
      data: pagedItems,
    };
  };


  module.exports = {getPaginatedItems}