import Announcement from "../models/announcement.js";

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json({ announcements });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve announcements' });
    }
};

export const createAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;
        const announcement = await Announcement.create({ title, description });
        res.status(201).json({ announcement: announcement._id });
    } catch (error) {
        res.status(400).json({ error });

    }
}
export const deleteAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const announcement = await Announcement.findByIdAndDelete(id);
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete announcement' });

    }
}
