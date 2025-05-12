package com.chatapp.handler;


import com.chatapp.dto.MessageDTO;
import com.chatapp.entity.Message;
import com.chatapp.repository.MessageRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class ChatHandler extends TextWebSocketHandler {

    @Autowired
    private MessageRepository messageRepository;

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Add the new session to the active sessions set
        sessions.add(session);
        System.out.println("New connection established: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        MessageDTO messageDTO = mapper.readValue(message.getPayload(), MessageDTO.class);

        Message msg = new Message(
            messageDTO.getContent(),
            messageDTO.getSender(),
            messageDTO.getReceiver(),
            LocalDateTime.now()
        );

        messageRepository.save(msg);

        // Broadcast to all sessions
        String jsonMessage = mapper.writeValueAsString(messageDTO);
        for (WebSocketSession ws : sessions) {
            if (ws.isOpen()) {
                ws.sendMessage(new TextMessage(jsonMessage));
            }
        }
    }



    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        // Remove the session from the active sessions set
        sessions.remove(session);
        System.out.println("Connection closed: " + session.getId());
    }
}
