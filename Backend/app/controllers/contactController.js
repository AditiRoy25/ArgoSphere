const ContactMessage = require("../models/ContactMessage");
const ContactInfo = require("../models/ContactInfo");

class ContactController {
  async sendMessage(req, res) {
    try {
      const contact = await ContactMessage.create(req.body);

      res.status(201).json({
        success: true,
        message: "Message sent successfully.",
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await ContactMessage.find().sort({
        createdAt: -1,
      });

      res.json({
        success: true,
        data: messages,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateMessageStatus(req, res) {
    try {
      const message = await ContactMessage.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json({
        success: true,
        data: message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteMessage(req, res) {
    try {
      await ContactMessage.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: "Deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getContactInfo(req, res) {
    try {
      const info = await ContactInfo.findOne();

      res.json({
        success: true,
        data: info,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateContactInfo(req, res) {
    try {
      const info = await ContactInfo.findOneAndUpdate(
        {},
        req.body,
        {
          new: true,
          upsert: true,
        }
      );

      res.json({
        success: true,
        message: "Contact information updated.",
        data: info,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ContactController();