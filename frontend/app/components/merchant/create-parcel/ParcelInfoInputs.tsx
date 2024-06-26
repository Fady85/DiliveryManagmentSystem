import {
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    SimpleGrid,
    Stack,
    Textarea,
    Select,
    RadioGroup,
    Radio,
} from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import SearchableAreaSelect from '~/components/common/SearchableAreaSelect'
import { useCreateParcelContext } from '~/context/CreateParcelContext'

interface ParcelInfoInputsProps {
    setCheckCondition: React.Dispatch<React.SetStateAction<boolean>>
}

const ParcelInfoInputs: FC<ParcelInfoInputsProps> = ({ setCheckCondition }) => {
    const {
        parcelProductParentCat,
        setSelectedArea,
        setWeight,
        setCashCollectionAmount,
    } = useCreateParcelContext()
    return (
        <GridItem colSpan={{ base: 6, lg: 4 }}>
            <Heading size="lg" mb={5}>
                Create new parcel
            </Heading>

            <Heading as="h5" fontSize="md" py={5}>
                Customer information
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5">
                <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                        type="text"
                        name="customerName"
                        placeholder="Customer name"
                        focusBorderColor="primary.500"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Phone number</FormLabel>
                    <Input
                        type="text"
                        name="customerPhone"
                        placeholder="Customer phone number"
                        focusBorderColor="primary.500"
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Customer address</FormLabel>
                    <Input
                        type="text"
                        name="customerAddress"
                        placeholder="Customer address"
                        focusBorderColor="primary.500"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>
                        Invoice Id <small>(Optional)</small>
                    </FormLabel>
                    <Input
                        type="text"
                        name="customerParcelInvoiceId"
                        placeholder="Invoice Id"
                        focusBorderColor="primary.500"
                    />
                </FormControl>
            </SimpleGrid>
            <Heading as="h5" fontSize="md" my={5}>
                Delivery information
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5">
                <FormControl isRequired>
                    <FormLabel>Percel weight (gm)</FormLabel>
                    <NumberInput
                        name="parcelWeight"
                        defaultValue="500"
                        min={500}
                        max={20000}
                        step={500}
                        focusBorderColor="primary.500"
                        onChange={(_, valueNumber) => setWeight(valueNumber)}
                    >
                        <NumberInputField placeholder="500gm" prefix="gm" />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Delivery area</FormLabel>
                    <SearchableAreaSelect
                        name="parcelDeliveryAreaId"
                        onChange={(e) =>
                            setSelectedArea({
                                area: e?.area!,
                                zoneId: e?.zoneId!,
                            })
                        }
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Cash collection ammount</FormLabel>
                    <NumberInput
                        name="parcelCashCollection"
                        focusBorderColor="primary.500"
                        min={0}
                        onChange={(_, value) => setCashCollectionAmount(value)}
                    >
                        <NumberInputField placeholder="Cash collection ammount" />
                    </NumberInput>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Percel product price</FormLabel>
                    <Input
                        type="text"
                        name="parcelPrice"
                        placeholder="Percel price"
                        focusBorderColor="primary.500"
                    />
                </FormControl>

                <Box>
                    <FormControl isRequired>
                        <FormLabel>Select percel product type</FormLabel>
                        <RadioGroup name="parcelProductType">
                            <Stack direction="row">
                                <Radio value="fragile">Fragile</Radio>
                                <Radio value="liquid">Liquid</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </Box>

                <FormControl isRequired>
                    <FormLabel>Product category</FormLabel>
                    <Select
                        placeholder="Choose product category"
                        name="parcelProductCategoriesId"
                        focusBorderColor="primary.500"
                    >
                        {parcelProductParentCat?.data.length
                            ? parcelProductParentCat?.data.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                      {cat.name}
                                  </option>
                              ))
                            : null}
                    </Select>
                </FormControl>
            </SimpleGrid>
            <FormControl my={5}>
                <FormLabel>
                    Extra information (ex: Parcel details, delivery, etc.)
                </FormLabel>
                <Textarea
                    name="parcelExtraInformation"
                    focusBorderColor="primary.500"
                    placeholder="Extra information"
                    rows={5}
                />
            </FormControl>
            <Checkbox
                colorScheme="primary"
                onChange={(e) => setCheckCondition(e.target.checked)}
            >
                Please mention product price. If the product is lost or damage
                the Amount of compensation will be determine based on the
                product price.
            </Checkbox>
        </GridItem>
    )
}

export default ParcelInfoInputs
