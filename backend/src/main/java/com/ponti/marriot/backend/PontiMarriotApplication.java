package com.ponti.marriot.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PontiMarriotApplication {

    protected static final Logger logger = LoggerFactory.getLogger(PontiMarriotApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(PontiMarriotApplication.class, args);
        logger.info("""


                ╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
                ║                                                                                                             ║
                ║   ██████╗  ██████╗ ███╗   ██╗████████╗██╗        ███╗   ███╗ █████╗ ██████╗ ██████╗ ██╗ ██████╗ ████████╗   ║
                ║   ██╔══██╗██╔═══██╗████╗  ██║╚══██╔══╝██║        ████╗ ████║██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗╚══██╔══╝   ║
                ║   ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██║ █████╗ ██╔████╔██║███████║██████╔╝██████╔╝██║██║   ██║   ██║      ║
                ║   ██╔═══╝ ██║   ██║██║╚██╗██║   ██║   ██║ ╚════╝ ██║╚██╔╝██║██╔══██║██╔══██╗██╔══██╗██║██║   ██║   ██║      ║
                ║   ██║     ╚██████╔╝██║ ╚████║   ██║   ██║        ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██║██║╚██████╔╝   ██║      ║
                ║   ╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝        ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝    ╚═╝      ║
                ║                                                                                                             ║
                ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
                                            🚀 PONTI-MARRIOT BACKEND LAUNCHED AND READY TO SERVE! 🚀
                """);
    }
}
