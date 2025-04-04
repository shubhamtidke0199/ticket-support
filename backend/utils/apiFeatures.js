class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }
   

   filter(){
      
      const queryCopy = {...this.queryStr };

      //Remove page number
      const removeFields = ["page", "limit"]
      removeFields.forEach(key => delete queryCopy[key]);

      this.query = this.query.find(queryCopy);
      
      return this;
   }

   pagination(resultsPerPage){
      const currentPage = Number(this.queryStr.page) || 1;
      const skipProducts = resultsPerPage * (currentPage - 1);
      this.query = this.query.limit(resultsPerPage).skip(skipProducts);
      return this;
   }
}

module.exports = ApiFeatures;