import { Router } from 'express';
import { db } from '../db.js';
import { authenticateToken, AuthenticatedRequest } from '../auth.js';
import { Message } from '../../src/types.js';

const router = Router();

// Get list of conversations for current user
router.get('/conversations', authenticateToken, (req: AuthenticatedRequest, res) => {
  const userId = req.user!.id;
  const convs = db.getConversations(userId);
  res.json(convs);
});

// Get messages for a specific conversation
router.get('/:conversationId', authenticateToken, (req: AuthenticatedRequest, res) => {
  const { conversationId } = req.params;
  const userId = req.user!.id;

  const messages = db.getMessages(conversationId, userId);
  res.json(messages);
});

// Send a message
router.post('/', authenticateToken, (req: AuthenticatedRequest, res) => {
  const senderId = req.user!.id;
  const { conversation_id, receiver_id, message, attachment } = req.body;

  if (!message && !attachment) {
    return res.status(400).json({ error: 'Message text or attachment is required' });
  }

  if (!receiver_id && !conversation_id) {
    return res.status(400).json({ error: 'Receiver ID or Conversation ID is required' });
  }

  let finalConvId = conversation_id;
  let finalReceiverId = receiver_id;

  if (!finalConvId) {
    // Find or create conversation between sender and receiver
    const existing = db.getConversations(senderId).find(c => 
      c.conversation.participants.includes(finalReceiverId)
    );
    if (existing) {
      finalConvId = existing.conversation.id;
    } else {
      finalConvId = `conv_${Date.now()}`;
    }
  } else if (!finalReceiverId) {
    const conv = db.getConversations(senderId).find(c => c.conversation.id === finalConvId);
    if (conv && conv.partner) {
      finalReceiverId = conv.partner.id;
    } else {
      finalReceiverId = 'usr_admin_simo';
    }
  }

  const newMsg: Message = {
    id: `msg_${Date.now()}`,
    conversation_id: finalConvId,
    sender_id: senderId,
    receiver_id: finalReceiverId,
    message: message || '',
    attachment: attachment || undefined,
    read_at: null,
    created_at: new Date().toISOString(),
  };

  const created = db.createMessage(newMsg);
  res.status(201).json(created);
});

// Start a conversation with an entity / admin / business / handyman
router.post('/start', authenticateToken, (req: AuthenticatedRequest, res) => {
  const senderId = req.user!.id;
  const { target_user_id, target_name, target_avatar, initial_message } = req.body;

  const targetId = target_user_id || 'usr_admin_simo';

  // Ensure target user exists in database so partner name/avatar is displayed
  let targetUser = db.getUserById(targetId);
  if (!targetUser) {
    targetUser = {
      id: targetId,
      name: target_name || 'কারিগর / সেবা প্রদানকারী',
      email: `${targetId}@boalkhali.com`,
      phone: '01800000000',
      password_hash: 'managed_service_user',
      avatar: target_avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(targetId)}`,
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString()
    };
    db.createUser(targetUser);
  }

  // Check if conversation already exists
  const convs = db.getConversations(senderId);
  const existing = convs.find(c => c.conversation.participants.includes(targetId));

  if (existing) {
    if (initial_message) {
      const newMsg: Message = {
        id: `msg_${Date.now()}`,
        conversation_id: existing.conversation.id,
        sender_id: senderId,
        receiver_id: targetId,
        message: initial_message,
        read_at: null,
        created_at: new Date().toISOString()
      };
      db.createMessage(newMsg);
    }
    return res.json({ conversationId: existing.conversation.id, isNew: false });
  }

  const newConvId = `conv_${Date.now()}`;
  if (initial_message) {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversation_id: newConvId,
      sender_id: senderId,
      receiver_id: targetId,
      message: initial_message,
      read_at: null,
      created_at: new Date().toISOString()
    };
    db.createMessage(newMsg);
  }

  res.json({ conversationId: newConvId, isNew: true });
});

export default router;
