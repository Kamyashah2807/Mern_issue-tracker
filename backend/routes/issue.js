const express = require("express");
const router = express.Router();

const { getAllIssue, createIssue, updateIssue, deleteIssue, getIssueDetails, getAllIssues } = require("../controller/issue");
const { isAuntheticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/all/issues").get(getAllIssue);

router.route("/all/issues/:id").get(getIssueDetails);

router.route("/issue").get(isAuntheticatedUser, getAllIssues);

router.route("/issue").post(isAuntheticatedUser, createIssue);

router.route("/update/issue/:id").put(isAuntheticatedUser, updateIssue);

router.route("/delete/issue/:id").delete(isAuntheticatedUser, deleteIssue);

module.exports = router; 