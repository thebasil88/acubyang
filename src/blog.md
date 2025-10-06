---
title: 'AcuByAng || Blog'
metadescription: Blog Posts
layout: 'layouts/maintenance.html'
pagination:
  data: collections.blog
  size: 60
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---


# content