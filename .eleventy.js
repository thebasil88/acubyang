const htmlmin = require('html-minifier')
const now = String(Date.now())
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, classes, sizes) {
	
  let metadata = await Image(src, {
    widths: [null, 300, 600],
    formats: ["webp","avif", "jpeg"],
	urlPath: "/images/",
	outputDir: "./dist/images/",
  });

  let imageAttributes = {
    alt,
    sizes,
	class: classes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
  
}

module.exports = config => {	
	// STYLESHEETS
	config.addWatchTarget('./styles/tailwind.config.js')
	config.addWatchTarget('./styles/tailwind.css')
	config.addPassthroughCopy({ './_tmp/style.css': './style.css' })
	config.addShortcode('version', function () {
		return now
	});
	
	//TO MINIFY AND TRANSFORM HTML
	config.addTransform('htmlmin', function (content, outputPath) {
		if (
		  process.env.ELEVENTY_PRODUCTION &&
		  outputPath &&
		  outputPath.endsWith('.html')
		) {
		  let minified = htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		  });
		  return minified
		}
		return content
	})

	
	
	/*
	const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

	// Filters
	const dateFilter = require('./src/filters/date-filter.js');
	const w3DateFilter = require('./src/filters/w3-date-filter.js');

	// Returns work items, sorted by display order
	config.addCollection('work', collection => {
	  return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
	});

	// Returns work items, sorted by display order then filtered by featured
	config.addCollection('featuredWork', collection => {
	  return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
		x => x.data.featured
	  );
	});
*/
	// Returns a collection of blog posts in reverse date order
	config.addCollection('blog', collection => {
	  return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
	});
	
	
	//PASS THROUGH ASSET FILES
	config.addPassthroughCopy('./src/images/');
	config.addPassthroughCopy({
	  './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
	})

	/* shortcodes for image */
	config.addNunjucksAsyncShortcode("image", imageShortcode);
	config.addLiquidShortcode("image", imageShortcode);
	config.addJavaScriptFunction("image", imageShortcode);


	//SET OUTPUT TO DIST FOLDER AND ALLOW THE USE OF NUNJUCKS IN STANDARD ENGINES
	
	const returnConfig = {
		markdownTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir:{
		  input: 'src',
	  	  output: '_site'
		}
	};
	config.cloudcannonOptions = eturnConfig;
	return returnConfig;
};
