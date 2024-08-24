import express from 'express';
import { submitRequest , getAllRequests , deleteAllRequests, deleteRequest, approveRequest,denyRequest,getRequest} from '../controllers/requestController.js';

const router = express.Router();


// Define route for submitting requests
router.post('/submit-request', submitRequest);
router.get('/get-requests', getAllRequests);
router.delete('/delete-all-requests', deleteAllRequests);
router.delete('/delete-request/:id', deleteRequest);
router.put('/approve-request/:id', approveRequest);
router.put('/deny-request/:id', denyRequest);
router.get('/get-request/:id', getRequest);

export default router;

