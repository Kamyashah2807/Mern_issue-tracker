const Issue = require("../models/issue");
const ApiFeature = require("../utils/apiFeature");

// Create Issue 
exports.createIssue = async (req, res) => {
    req.body.user = req.user.id;
    const issue = await Issue.create(req.body);

    issue.save((err, data) => {
        if (err) {
            res.status(400).json({
                errorMessage: err,
                status: false
            });
        } else {
            res.status(200).json({
                status: true,
                issue,
                message: 'Issue Added successfully.'
            });
        }
    });
}

// Get All issues --admin 
exports.getAllIssue = async (req, res) => {
    const resultPerPage = 5;

    const issueCount = await Issue.countDocuments();

    const apiFeature = new ApiFeature(Issue.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage)

    const issues = await apiFeature.query.populate("user", "name email");

    res.status(200).json({
        success: true,
        issues,
        issueCount,
        resultPerPage,
    });
}

// Get Issues by user id
exports.getAllIssues = async (req, res) => {
    var query = {};
    query["$and"] = [];
    query["$and"].push({
        is_delete: false,
        user: req.user.id
    });
    if (req.query && req.query.search) {
        query["$and"].push({
            title: { $regex: req.query.search }
        });
    }
    var perPage = 5;
    var page = req.query.page || 1;
    Issue.find(query, { date: 1, title: 1, id: 1, description: 1, status: 1, image: 1 }).sort({ date: -1 })
        .skip((perPage * page) - perPage).limit(perPage)
        .then((data) => {
            Issue.find(query).count()
                .then((count) => {
                    if (data && data.length > 0) {
                        res.status(200).json({
                            status: true,
                            title: 'Issue retrived.',
                            issues: data,
                            current_page: page,
                            total: count,
                            pages: Math.ceil(count / perPage),
                        });
                    } else {
                        res.status(400).json({
                            errorMessage: 'There is no issue!',
                            status: false
                        });
                    }
                });
        }).catch(err => {
            res.status(400).json({
                errorMessage: err.message || err,
                status: false
            });
        });
}

exports.getIssueDetail = async (req, res, next) => {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return res.status(500).json({
            success: false,
            message: "Issue not Found"
        })
    }

    res.status(200).json({
        success: true,
        product,
    })
}

// Update Issue
exports.updateIssue = async (req, res) => {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
        return res.status(500).json({
            success: false,
            message: "Issue not Found"
        })
    }

    issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Issue Updated",
        issue
    })
}

// Delete Issue
exports.deleteIssue = async (req, res, next) => {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return res.status(500).json({
            success: false,
            message: "Issue not Found"
        })
    }

    await issue.remove();
    res.status(200).json({
        success: true,
        message: "Issue Deleted"
    })
}

// Get Single id issue
exports.getIssueDetails = async (req, res, next) => {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
        return res.status(500).json({
            success: false,
            message: "Issue not Found"
        })
    }

    res.status(200).json({
        success: true,
        issue,
    })
}
