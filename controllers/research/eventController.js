const { sendError, validateID } = require('../../utils');
// const Event = require('../../models/research/events');
const UpcomingEvent = require('../../models/upcomingEvent');

const createTimeStamp = (date, time) => {
    // date and time are strings in DD-MM-YYYY and HH:MM format
    const dateParts = date.split('-');
    const timeParts = time.split(':');

    const dateTime = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[0]),
        parseInt(timeParts[0]),
        parseInt(timeParts[1])
    );

    return dateTime;

};

const getAllevents = (req, res) => {
    // filter by req.query.visible if it is not all
    let filter = {};

    //filter by req.query
    if (req.query.category !== 'all') {
        filter.type = req.query.category;
    }
    if (req.query.visible === 'visible') {
        filter.show = true;
    } else if (req.query.visible === 'hidden') {
        filter.show = false;
    } else if (req.query.visible !== 'all') {
        return sendError(res, `Invalid value for visible: ${req.query.visible}`);
    }

    // filter upcoming and past events
    if (req.query.upcoming === 'true') {
        filter.startDate = { $gte: new Date() };
    } else if (req.query.upcoming === 'false') {
        filter.startDate = { $lt: new Date() };
    } else if (req.query.upcoming !== 'all') {
        return sendError(res, `Invalid value for upcoming: ${req.query.upcoming}`);
    }

    // sort ascending if upcoming is true, descending otherwise
    UpcomingEvent
        .find(filter)
        .sort({ startDate: req.query.upcoming === 'true' ? 'asc' : 'desc' })
        .then((events) => res.json(events))
        .catch((err) => sendError(res, err));

    // // filter upcoming and past events
    // if (req.query.upcoming === 'true') {
    //     filter.dateTime = { $gte: new Date() };
    // } else if (req.query.upcoming === 'false') {
    //     filter.dateTime = { $lt: new Date() };
    // } else if (req.query.upcoming !== 'all') {
    //     return sendError(res, `Invalid value for upcoming: ${req.query.upcoming}`);
    // }

    // // sort ascending if upcoming is true, descending otherwise
    // Event
    //     .find(filter)
    //     .sort({ dateTime: req.query.upcoming === 'true' ? 'asc' : 'desc' })
    //     .then((events) => res.json(events))
    //     .catch((err) => sendError(res, err));
};

const createevent = (req, res) => {
    // create timestamp from date and time
    req.body.dateTime = createTimeStamp(req.body.date, req.body.time);

    // delete date and time from req.body
    delete req.body.date;
    delete req.body.time;

    const newevent = new Event(req.body);

    newevent.save()
        .then((createdevent) => res.status(201).json(createdevent))
        .catch((err) => sendError(res, err));
};

const geteventByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    Event
        .findById(id)
        .then((event) => {
            if (!event) {
                return sendError(res, `event not found with ID: ${id}`);
            }

            res.json(event);
        })
        .catch((err) => sendError(res, err));
};

const updateeventByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    if(req.body.date && req.body.time) {
        req.body.dateTime = createTimeStamp(req.body.date, req.body.time);
    }

    // delete date and time from req.body
    delete req.body.date;
    delete req.body.time;

    Event
        .findByIdAndUpdate(id, req.body, { new: true })
        .then((updatedevent) => {
            if (!updatedevent) {
                return sendError(res, `event not found with ID: ${id}`);
            }

            res.json(updatedevent);
        })
        .catch((err) => sendError(res, err));
};

const editMetaData = (req, res) => {
    const id = req.query.id;
    validateID(id).then(() => {
        Event.findById(id)
            .then((event) => {
                if (req.query.action === 'toggleVisibility') {
                    event.visible = !event.visible;
                    event.visibilityChangedAt = Date.now();
                } else if (req.query.action === 'toggleNew') {
                    event.new = !event.new;
                } else {
                    return res.status(400).json({
                        message: 'Invalid action'
                    });
                }
                event.save()
                    .then((updatedEvent) => res.json(updatedEvent))
                    .catch((err) => sendError(res, err));
            })
            .catch((err) => sendError(res, err));
    })
        .catch((err) => sendError(res, err));
};

const deleteeventByID = (req, res) => {
    const id = req.query.id;

    if (!validateID(id)) {
        return sendError(res, `Invalid ID: ${id}`);
    }

    Event
        .findByIdAndDelete(id)
        .then((deletedevent) => {
            if (!deletedevent) {
                return sendError(res, `event not found with ID: ${id}`);
            }

            res.json(deletedevent);
        })
        .catch((err) => sendError(res, err));
};

module.exports = {
    getAllevents,
    createevent,
    geteventByID,
    updateeventByID,
    hideeventByID: editMetaData,
    deleteeventByID
};