import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as adminController from '../controllers/admin.controller';

const router = Router();

router.use(authenticate, requireRole('admin'));

// Teacher management
router.get('/teachers', adminController.getTeachers);
router.post('/teachers', adminController.appointTeacher);
router.patch('/teachers/:id', adminController.updateTeacher);

// Student management
router.get('/students', adminController.getStudents);
router.post('/students', adminController.enrollStudent);

// Class management
router.get('/classes', adminController.getClasses);
router.post('/classes', adminController.createClass);

// Promote
router.post('/promote', adminController.promoteStudents);

// System config
router.get('/config', adminController.getConfig);
router.patch('/config', adminController.updateConfig);

// Audit log
router.get('/audit-log', adminController.getAuditLog);

// Analytics
router.get('/analytics', adminController.getAnalytics);

// Announcements
router.post('/announcements', adminController.broadcastAnnouncement);

export default router;
