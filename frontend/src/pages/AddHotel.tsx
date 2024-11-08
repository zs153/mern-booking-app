import { useAddHotel } from "@/api-client";
import { useAppContext } from "@/contexts/AppContext";
import { useMutation } from "react-query";
import ManageHotelForm from "@/forms/manageHotel/ManageHotelForm";

const addHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(useAddHotel, {
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

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default addHotel;
