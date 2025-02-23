export default [
  {
    path: "/issues",
    needLogin: false,
  },
  {
    path: "/issues/:issueId",
    needLogin: false,
  },
  {
    path: "/addIssue",
    needLogin: true,
  },
  {
    path: "/books",
    needLogin: false,
  },
  {
    path: "/books/:bookId",
    needLogin: false,
  },
  {
    path: "/interviews",
    needLogin: false,
  },
  {
    path: "/searchPage",
    needLogin: false,
  },
  {
    path: "/personal",
    needLogin: true,
  },
  {
    path: "/",
    needLogin: false,
  },
];
