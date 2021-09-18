import { extendTheme } from "@chakra-ui/react";


const customTheme = extendTheme({
    components: {
        Button: {
            baseStyle:{
                fontWeight: "bold",
                textTransform: "Capitalize",
                marginTop: 5
            },
            
            variants: {
                "electric":{ bg: "#ffeb3b", color: "#000" },
                "bug"     :{ bg: "#cddc39", color: "#000" },
                "dark"    :{ bg: "#212121", color: "#fff" },
                "dragon"  :{ bg: "#bf360c", color: "#fff" },
                "fairy"   :{ bg: "#d500f9", color: "#fff" },
                "fighting":{ bg: "#e53935", color: "#fff" },
                "fire"    :{ bg: "#fb8c00", color: "#000" },
                "flying"  :{ bg: "#29b6f6", color: "#fff" },
                "ghost"   :{ bg: "#6a1b9a", color: "#fff" }, 
                "grass"   :{ bg: "#8bc34a", color: "#fff" },
                "ground"  :{ bg: "#795548", color: "#fff" },
                "ice"     :{ bg: "#b3e5fc", color: "#000" },
                "normal"  :{ bg: "#cfd8dc", color: "#000" },
                "poison"  :{ bg: "#ab47bc", color: "#fff" }, 
                "psychic" :{ bg: "#aa00ff", color: "#fff" },
                "rock"    :{ bg: "#3e2723", color: "#fff" },
                "shadow"  :{ bg: "#263238", color: "#fff" },
                "steel"   :{ bg: "#546e7a", color: "#fff" },
                "water"   :{ bg: "#2196f3", color: "#fff" },
            },
        },


    }

});

export default customTheme;
