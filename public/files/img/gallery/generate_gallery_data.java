import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Objects;
import java.util.stream.Stream;

public class generate_gallery_data {
    public static String result = "";
    public static int current_year = 0;
    public static int current_month = 0;
    public static String current_location = "";
    public static int current_total_photos = 0;
    public static int current_year_total_photos = 0;
    public static int current_location_month_count = 0;

    public static void listFilesForFolder(final File folder) {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                listFilesForFolder(fileEntry);
            } else {
                String s = fileEntry.getPath();
                String[] parts = s.split("/");
                if(parts.length<4){
                    continue;
                }
                System.out.println("Processing:" + s);
                int this_year = Integer.parseInt(parts[1]);
                int this_month = Integer.parseInt(parts[2]);
                String this_location = parts[3];
                current_total_photos++;
                current_year_total_photos++;

                if(this_year!=current_year){
                    String temp_result = "";
                    if(current_year == 0){
                        result+="var gallery_data = { data : [{year:" + this_year + ",cards:[";
                    }else{
                        if(current_location_month_count==0){
                            temp_result += "{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                        }else{
                            temp_result += ",{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                        }
                        temp_result += "],total_photos:"+current_year_total_photos+"},{year:" + this_year + ",cards:[";
                    }
                    result += temp_result;
                    current_total_photos = 0;
                    current_year_total_photos = 0;
                    current_location_month_count = 0;
                    current_location = this_location;
                    current_year = this_year;
                    current_month = this_month;
                }else if(this_month!=current_month){
                    if(current_location_month_count == 0){
                        result += "{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                    }else{
                        result += ",{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                    }
                    current_location_month_count++;
                    current_total_photos = 0;
                    current_month = this_month;
                    current_location = this_location;
                }else if(!Objects.equals(this_location, current_location)){
                    if(current_location_month_count == 0){
                        result += "{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                    }else{
                        result += ",{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                    }
                    current_location_month_count++;
                    current_total_photos = 0;
                    current_month = this_month;
                    current_location = this_location;
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("Processing...");

        final File folder = new File(".");
        listFilesForFolder(folder);
        			current_total_photos++;
                current_year_total_photos++;
                    String temp_result = "";
                    if(current_year == 0){
                        result+="var gallery_data = { data : [{year:" + current_year + ",cards:[";
                    }else{
                        if(current_location_month_count==0){
                            temp_result += "{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                        }else{
                            temp_result += ",{id:'id"+current_location_month_count+"_"+current_year+"',month:"+current_month+",location:'"+current_location+"',desc:'Photos from "+current_location+"',total_photos:"+current_total_photos+"}";
                        }
                        temp_result += "],total_photos:"+current_year_total_photos+"}";
                    }
                    result += temp_result;
        result += "]};";
        System.out.println(result);

        BufferedWriter writer = null;
        try {
            //create a temporary file
            String fileName = "gallery-data.js";
            File logFile = new File(fileName);

            writer = new BufferedWriter(new FileWriter(logFile));
            writer.write(result);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                // Close the writer regardless of what happens...
                writer.close();
            } catch (Exception e) {
            }
        }

    }
}
