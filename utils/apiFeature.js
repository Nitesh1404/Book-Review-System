class APIFeature {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	limitingFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			console.log('Selected fields:', fields);
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}

		return this;
	}

	pagination() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

module.exports = APIFeature;