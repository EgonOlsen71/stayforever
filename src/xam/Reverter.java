package xam;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Reverts the directions on a command file to move backwards
 */
public class Reverter {

    public static void main(String[] args) throws Exception {

        Map<String, String> reverse = new HashMap<String, String>() {
            {
                put("n", "s");
                put("o", "w");
                put("s", "n");
                put("w", "o");
                put("no", "sw");
                put("so", "nw");
                put("sw", "no");
                put("nw", "so");
                put("h", "r");
                put("r", "h");
                put("benutze zug", "benutze zug"); // Do make it stay in the list...
                put("benutze fahrrad", "benutze fahrrad");
                put("gib fahrer den gutschein", "gib fahrer den gutschein");
            }
        };
        String file = "E:\\src\\IntelliJ\\StayForever\\help\\StayForever-Stresstest.txt";
        Path path = Paths.get(file);
        List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
        Collections.reverse(lines);

        lines.stream().filter(p -> reverse.containsKey(p.trim())).map(s -> reverse.get(s)).forEach(System.out::println);
    }

}
