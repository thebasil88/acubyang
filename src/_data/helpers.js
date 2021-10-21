module.exports = {
  /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
		response = ' text-indigo-600 hover:text-indigo-500';
    }
	else
	{
		response = ' text-gray-500 hover:text-gray-900';
	}

  

    return response;
  }
};
