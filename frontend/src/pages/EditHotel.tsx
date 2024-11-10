import { fetchHotelById, useUpdateHotel } from "@/api-client";
import { useAppContext } from "@/contexts/AppContext";
import ManageHotelForm from "@/forms/manageHotel/ManageHotelForm";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: async () => {
      const data = await fetchHotelById(hotelId || "");

      return data;
    },
    enabled: !!hotelId,
  });

  const { mutate, isLoading } = useMutation(useUpdateHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error saving hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditHotel;
