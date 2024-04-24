import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [dimension, setDimension] = useState(dataEdit.dimension || "");
  const [activityType, setActivityType] = useState(dataEdit.activityType || "");
  const [hoursQuantity, setHoursQuantity] = useState(dataEdit.hoursQuantity || "");

  const handleSave = () => {
    if (!dimension || !activityType || !hoursQuantity) return;

    const newDataItem = {
      id: data.length + 1, // Generate an incremental ID
      dimension,
      activityType,
      hoursQuantity,
    };

    let newDataArray;
    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = newDataItem;
      newDataArray = data.slice(); // Clone the array
    } else {
      newDataArray = [...(data ? data : []), newDataItem];
    }

    localStorage.setItem("cad_hora", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={6}>
              <Box>
                <FormLabel>Dimensão</FormLabel>
                <Select
                  value={dimension}
                  onChange={(e) => setDimension(e.target.value)}
                >
                  <option value="Ensino">Ensino</option>
                  <option value="Pesquisa">Pesquisa</option>
                  <option value="Extensão">Extensão</option>
                  <option value="Extras">Extras</option>
                </Select>
              </Box>
              <Box>
                <FormLabel>Tipo de Atividade</FormLabel>
                <Input
                  type="text"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Quantidade de Horas</FormLabel>
                <Input
                  type="number"
                  value={hoursQuantity}
                  onChange={(e) => setHoursQuantity(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
