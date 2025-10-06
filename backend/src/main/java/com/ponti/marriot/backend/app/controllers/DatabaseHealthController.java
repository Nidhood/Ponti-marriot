package com.ponti.marriot.backend.app.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor // genera constructor con args para los campos final
public class DatabaseHealthController {

    private final JdbcTemplate jdbcTemplate;

    @GetMapping("/db/test")
    public String testConnection() {
        try {
            List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT now()");
            return "✅ Conexión exitosa a CockroachDB. Hora del servidor: " + result.get(0).get("now");
        } catch (Exception e) {
            log.error("Error al conectar a CockroachDB", e);
            return "❌ Error al conectar a CockroachDB: " + e.getMessage();
        }
    }
}