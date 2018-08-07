class MathUtilties

    EARTH_RADIUS = 6371009;

    def hav(x) 
        sinHalf = Math.sin(x * 0.5);
        sinHalf * sinHalf;
    end


    def arcHave(x)
        2 * Math.asin(Math.sqrt(x))
    end

    def havDistance( lat1, lat2, dLng) 
         hav(lat1 - lat2) + hav(dLng) *  Math.cos(lat1) * Math.cos(lat2)
    end

    def toRadians(degrees)
        degrees * Math::PI / 180 
    end

    def toDegrees(angrad)
        angrad * 180.0 / Math::PI
    end
    
end