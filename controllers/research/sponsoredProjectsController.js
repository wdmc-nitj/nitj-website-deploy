const { sendError, validateID } = require('../../utils');
const SponsoredProject = require('../../models/research/sponsoredProjects');

const createSponsoredProject = (req, res) => {
    const newSponsoredProject = new SponsoredProject(req.body);

    newSponsoredProject.save()
        .then(sponsoredProject => res.status(201).json(sponsoredProject))
        .catch(err => sendError(res, err));
};

const getAllSponsoredProjects = (req, res) => {
    let filter = {};

    if (req.query.visible === 'visible') {
        filter.visible = true;
    } else if (req.query.visible === 'hidden') {
        filter.visible = false;
    } else if (req.query.visible !== 'all') {
        return sendError(res, `Invalid value for visible: ${req.query.visible}`);
    }

    SponsoredProject
        .find(filter)
        .then(sponsoredProjects => res.json(sponsoredProjects))
        .catch(err => sendError(res, err));
};

const getVisibleSponsoredProjectsInYear = (req, res) => {
    const year = req.query.startYear;

    if (!year) {
        return sendError(res, `Invalid year: ${year}`);
    }

    SponsoredProject
        .find({ yearOfSanctionStart: year, visible: true })
        .then(sponsoredProjects => res.json(sponsoredProjects))
        .catch(err => sendError(res, err));
};

const getVisibleSponsoredProjectsGroupedByYear = (req, res) => {
    SponsoredProject
        .find({ visible: true })
        .then(sponsoredProjects => {
            const groupedSponsoredProjects = sponsoredProjects.reduce((acc, curr) => {
                const year = curr.yearOfSanctionStart;
                if (!acc[year]) {
                    acc[year] = [];
                }
                acc[year].push(curr);
                return acc;
            }, {});

            res.json(groupedSponsoredProjects);
        })
        .catch(err => sendError(res, err));
};


const getSponsoredProjectByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    SponsoredProject
        .findById(id)
        .then(sponsoredProject => {
            if (!sponsoredProject) {
                return sendError(res, `Sponsored Project not found with ID: ${id}`);
            }

            res.json(sponsoredProject);
        })
        .catch(err => sendError(res, err));
};

const updateSponsoredProjectByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    SponsoredProject
        .findByIdAndUpdate(id, req.body, { new: true })
        .then(sponsoredProject => {
            if (!sponsoredProject) {
                return sendError(res, `Sponsored Project not found with ID: ${id}`);
            }

            res.json(sponsoredProject);
        })
        .catch(err => sendError(res, err));
};

const editMetaData = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        SponsoredProject.findById(id)
            .then((sponsoredProject) => {
                if (req.query.action === 'toggleVisibility') {
                    sponsoredProject.visible = !sponsoredProject.visible;
                    sponsoredProject.visibilityChangedAt = Date.now();
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                sponsoredProject.save()
                    .then((updatedSponsoredProject) => res.json(updatedSponsoredProject))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};

const deleteSponsoredProjectByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    SponsoredProject
        .findByIdAndDelete(id)
        .then(sponsoredProject => {
            if (!sponsoredProject) {
                return sendError(res, `Sponsored Project not found with ID: ${id}`);
            }

            res.json(sponsoredProject);
        })
        .catch(err => sendError(res, err));
};

module.exports = {
    createSponsoredProject,
    getAllSponsoredProjects,
    getVisibleSponsoredProjectsInYear,
    getVisibleSponsoredProjectsGroupedByYear,
    getSponsoredProjectByID,
    updateSponsoredProjectByID,
    hideSponsoredProjectByID: editMetaData,
    deleteSponsoredProjectByID
};