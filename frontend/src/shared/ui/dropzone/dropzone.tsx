import { Text, Group, rem, SimpleGrid, Image, useMantineTheme, Box } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { AiOutlineCloudDownload, AiOutlineDownload } from 'react-icons/ai';
import { PiProhibitBold } from 'react-icons/pi';
import classes from './dropzone.module.css';
import '@mantine/dropzone/styles.css';

interface DropzoneButtonParams {
    files: FileWithPath[];
    setFiles: (files: FileWithPath[]) => void;
    withPreviews?: boolean;
}

export const DropzoneButton = ({ setFiles, files, withPreviews = true }: DropzoneButtonParams) => {
    const theme = useMantineTheme();

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <>
            {withPreviews && (
                <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                    {previews}
                </SimpleGrid>
            )}
            <Box className={classes.wrapper}>
                <Dropzone
                    onDrop={setFiles}
                    className={classes.dropzone}
                    radius='md'
                    accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.webp, MIME_TYPES.avif]}
                    maxSize={30 * 1024 ** 2}
                    multiple
                >
                    <div style={{ pointerEvents: 'none' }}>
                        <Group justify='center'>
                            <Dropzone.Accept>
                                <AiOutlineDownload
                                    style={{ width: rem(50), height: rem(50) }}
                                    color={theme.colors.blue[6]}
                                    stroke={rem(1.5)}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <PiProhibitBold
                                    style={{ width: rem(50), height: rem(50) }}
                                    color={theme.colors.red[6]}
                                    stroke={rem(1.5)}
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <AiOutlineCloudDownload style={{ width: rem(50), height: rem(50) }} stroke={rem(1.5)} />
                            </Dropzone.Idle>
                        </Group>

                        <Text ta='center' fw={700} fz='lg' mt='xl'>
                            <Dropzone.Accept>Drop files here</Dropzone.Accept>
                            <Dropzone.Reject>Reject</Dropzone.Reject>
                            <Dropzone.Idle>Upload images</Dropzone.Idle>
                        </Text>
                        <Text ta='center' fz='sm' mt='xs' c='dimmed'>
                            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.png .jpeg .webp .avif</i>
                        </Text>
                    </div>
                </Dropzone>
            </Box>
        </>
    );
};
