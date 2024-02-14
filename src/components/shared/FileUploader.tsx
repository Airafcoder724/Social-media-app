import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button';

type FileUploderProps = {
    filedChange: (FILES: File[]) => void;
    mediaUrl: string
}

const FileUploader = ({ filedChange, mediaUrl }: FileUploderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(mediaUrl);
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        filedChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.gif', '.jpg', '.jpeg', '.jpg', '.svg']
        }
    })

    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl ? (
                    <>
                    <div className='flex flex-1 justify-center w-full p-5 lg:p10  '>
                       <img 
                       src={fileUrl}
                       alt='preivew'
                       className='file_uploader-img'
                       />
                    </div>
                       <p className='file_uploader-label'>Click or drag Photo to change</p>
                    </>
                ) : (
                    <div className='file_uploader-box '>
                        <img src='/assets/icons/file-upload.svg'
                            width={96}
                            height={77}
                            alt='file upload'
                        />
                        <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag Photo here</h3>
                        <p className='text-light-4 small-regular mb-6'>SVG PNJ JPJ</p>
                        <Button className='shad-button_dark_4'>Select from computer</Button>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader