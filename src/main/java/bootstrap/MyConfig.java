package bootstrap;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.springframework.util.ResourceUtils;

public class MyConfig {

    private static final Logger LOGGER = Logger.getLogger(MyApplication.class);

    public static Properties fetchProperties() throws URISyntaxException, IOException {
        Properties properties = new Properties();

        String path;

        // path =
        // "C:\\Users\\Administrator.SERVER2\\Desktop\\demo-hello-world\\application.properties";

        LOGGER.info("::::::::::properties path::::::> " + new File(".").getAbsolutePath());
        LOGGER.warn("::::::::::properties path::::::> " + new File(".").getAbsolutePath());
        LOGGER.error("::::::::::properties path::::::> " + new File(".").getAbsolutePath());

        path = new File(".").getAbsolutePath() + "\\application.properties";

        File file = ResourceUtils.getFile(path);
        InputStream in = new FileInputStream(file);
        properties.load(in);

        return properties;
    }
}