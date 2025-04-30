import { errorResponse, successResponse } from "../utils/responseHandler.js";

export const helloTest = (req, res) => {
    try {
        successResponse(res, 200, 'Hello World', null, req);
    } catch (error) {
        errorResponse(res, error, 500);
    }
};

export const getParticipantSummary = (req, res) => {
    const coachUsername =  req.user?.username || 'james';
    try {
        const mockParticipants = [
            { id: 'p1', name: 'John Doe', assignedTo: coachUsername },
            { id: 'p2', name: 'Jane Smith', assignedTo: coachUsername },
        ];

        const data = {
            coach: coachUsername,
            participants: mockParticipants,
        }
        successResponse(res, 200, 'Fetch participant successfulyy', data, req);
    } catch (error) {
        errorResponse(res, error, 500);
    }

};
