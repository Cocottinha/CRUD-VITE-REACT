import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_customer = localStorage.getItem("cad_hora")
      ? JSON.parse(localStorage.getItem("cad_hora"))
      : [];

    setData(db_customer);
  }, [setData]);

  const handleRemove = (id) => {
    const newArray = data.filter((item) => item.id !== id);

    setData(newArray);

    localStorage.setItem("cad_hora", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="Arial"
    >
      <Box maxW={2000} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="gray" color="black" onClick={() => [setDataEdit({}), onOpen()]}>
          CADASTRAR HORA
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 1 : 500} fontSize="20px" color="gray">
                  ID
                </Th>
                <Th maxW={isMobile ? 1 : 500} fontSize="20px" color="gray">
                  Dimensão
                </Th>
                <Th maxW={isMobile ? 1 : 500} fontSize="20px" color="gray">
                  Tipo de Atividade
                </Th>
                <Th maxW={isMobile ? 1 : 500} fontSize="20px" color="gray">
                  Qtd de Horas
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ id, dimension, activityType, hoursQuantity }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "blue.100" }}>
                  <Td maxW={isMobile ? 1 : 500}>{id}</Td>
                  <Td maxW={isMobile ? 1 : 500}>{dimension}</Td>
                  <Td maxW={isMobile ? 1 : 500}>{activityType}</Td>
                  <Td maxW={isMobile ? 1 : 500}>{hoursQuantity}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ dimension, activityType, hoursQuantity, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
