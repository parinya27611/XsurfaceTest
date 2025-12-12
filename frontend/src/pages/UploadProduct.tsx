import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import upload from "@/assets/product/upload.png";
import styled, { css } from "styled-components";
import toast from "react-hot-toast";
import { getProductById, createProduct, updateProduct } from "@/api/products";
import type { ProductFormData } from "@/types/product";

const Main = styled.main`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;

  @media (max-width: 620px) {
    padding: 20px;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  color: #252525;
  margin-bottom: 25px;
  transition: color 0.2s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: #bfbfbf;
  }

  @media (max-width: 620px) {
    margin-bottom: 0px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #252525;
  margin-bottom: 30px;

  @media (max-width: 620px) {
    margin-bottom: 15px;
  }
`;

const Form = styled.form`
  max-width: 924px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 620px) {
    gap: 10px;
  }
`;

const BrowseLabel = styled.label`
  font-weight: 300;
  font-size: 0.75rem;
  letter-spacing: 0.4px;
  text-align: center;
  color: #6c6c70;
`;

const RequestText = styled.p`
  font-weight: 300;
  font-size: 0.75rem;
  text-align: right;
  color: #6c6c70;
  margin: 10px 0 0;
`;

const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 620px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 10px;
  }
`;

const PreviewItem = styled.div`
  position: relative;
  width: 120px;
  height: 120px;

  @media (max-width: 620px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 400px) {
    width: 80px;
    height: 80px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ef4444;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FieldLabel = styled.label`
  font-weight: 400;
  font-size: 1rem;
  color: #252525;
`;

const DropZone = styled.div<{ $dragOver: boolean }>`
  height: 350px;
  border: 2px dashed;
  border-radius: 24px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  ${({ $dragOver }) =>
    $dragOver
      ? css`
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.05);
        `
      : css`
          border-color: #d9d9d9;
        `}

  @media (max-width: 620px) {
    height: 250px;
  }

  @media (max-width: 400px) {
    height: 200px;
  }
`;

const ImagePlus = styled.img`
  width: 26px;
  height: 27px;
`;
const DragDrop = styled.p`
  font-weight: 400;
  font-size: 0.87rem;
  letter-spacing: 0.4px;
  text-align: center;
  color: #6b7280;
  margin-bottom: 5px;

  label {
    margin: 0 6px;
    color: #3b82f6;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  input {
    display: none;
  }
`;

const Input = styled.input`
  padding: 0 24px;
  border: 1px solid #d9d9d9;
  height: 56px;
  opacity: 1;
  border-radius: 24px;
  font-weight: 400;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: #d9d9d9;
    opacity: 1;
    font-size: 1rem;
    font-weight: 400;
    transition: color 0.2s ease;
  }

  @media (max-width: 400px) {
    height: 45px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-top: 20px;
`;

const UploadButton = styled.button`
  width: 190px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 24px;
  background: #e04132;
  color: #ffffff;
  cursor: pointer;
  font-weight: 400;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 400px) {
    height: 45px;
  }
`;

const SecondaryButton = styled(Link)`
  width: 190px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 24px;
  background: #ffffff;
  cursor: pointer;
  text-decoration: none;
  color: #e13b30;
  font-weight: 400;
  font-size: 1rem;

  &:hover {
    background: #f9f9f9;
  }

  @media (max-width: 400px) {
    height: 45px;
  }
`;

const UploadProduct = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [formImages, setFormImages] = useState<File[]>([]);
  const [removeImages, setRemoveImage] = useState<string[]>([]);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    code: "",
    price: 0,
    images: [],
  });

  const [dragOver, setDragOver] = useState(false);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const allowed = ["image/jpeg", "image/png"];
    const MAX_SIZE = 50 * 1024 * 1024;

    const fileArray = Array.from(files);

    const validFiles = fileArray.filter((file) => {
      if (!allowed.includes(file.type)) {
        toast.error("File type not supported: " + file.type);
        return false;
      }
      if (file.size > MAX_SIZE) {
        toast.error("File is too large: " + file.name);
        return false;
      }
      return true;
    });
    if (
      images.length + validFiles.length + (formData.images?.length || 0) >
      6
    ) {
      toast.error("Maximum 6 images allowed!");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFormImages((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImageFile = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImageFormData = (img: string) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((i) => i !== img),
    });

    setRemoveImage((prev) => [...prev, img]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length + (formData.images?.length || 0) === 0) {
      toast.error("Images required!");
      return;
    }
    if (!formData.name) {
      toast.error("Product Name required fields!");
      nameRef.current?.focus();
      return;
    }

    if (!formData.code) {
      toast.error("Code required fields!");
      codeRef.current?.focus();
      return;
    }

    if (!formData.price) {
      toast.error("Price required fields!");
      priceRef.current?.focus();
      return;
    }

    const priceNumber = Number(formData.price);

    if (!Number.isInteger(priceNumber)) {
      toast.error("Price must be an integer");
      priceRef.current?.focus();
      return;
    }

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("code", formData.code);
    fd.append("price", priceNumber.toString());
    fd.append("removedImages", JSON.stringify(removeImages));
    formImages.forEach((file) => fd.append("images", file));
    try {
      if (id) {
        await updateProduct(id, fd);
        toast.success("Product Update successfully");
      } else {
        await createProduct(fd);
        toast.success("Product Create successfully");
      }
      navigate("/product-list");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to submit product";
      toast.error(message);
    }
  };

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setFormData(data);
        }
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Failed to fetch product";
        toast.error(message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Main>
      <BackLink to="/product-list">
        <ChevronLeft />
        Back to Products
      </BackLink>
      <Title>Upload Product</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel>Upload image</FieldLabel>
          <DropZone
            $dragOver={dragOver}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleImageUpload(e.dataTransfer.files);
            }}
          >
            <ImagePlus src={upload} />
            <DragDrop>
              Drag & Drop or
              <label>
                Choose file
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg, image/png"
                  multiple
                  onChange={(e) => handleImageUpload(e.target.files)}
                />
              </label>
              to upload
            </DragDrop>

            <BrowseLabel>
              <span>JPG. or PNG Maximum file size 50MB.</span>
            </BrowseLabel>
          </DropZone>
          <RequestText>
            Image upload ({images.length + (formData.images?.length || 0)}/6)
          </RequestText>
        </Field>
        <PreviewGrid>
          {(formData.images?.length || 0) > 0 &&
            formData.images?.map((image, index) => (
              <PreviewItem key={`${image}-${index}`}>
                <PreviewImage
                  src={image}
                  alt={`Upload ${index + 1}`}
                  loading="lazy"
                />

                <RemoveButton
                  type="button"
                  onClick={() => removeImageFormData(image)}
                >
                  <X />
                </RemoveButton>
              </PreviewItem>
            ))}
          {images.length > 0 &&
            images.map((image, index) => (
              <PreviewItem key={`${image}-${index}`}>
                <PreviewImage
                  src={image}
                  alt={`Upload ${index + 1}`}
                  loading="lazy"
                />

                <RemoveButton
                  type="button"
                  onClick={() => removeImageFile(index)}
                >
                  <X />
                </RemoveButton>
              </PreviewItem>
            ))}
        </PreviewGrid>
        <Field>
          <FieldLabel htmlFor="name">Product Name</FieldLabel>
          <Input
            id="name"
            ref={nameRef}
            value={formData.name}
            placeholder="Product name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="code">Code</FieldLabel>
          <Input
            id="code"
            ref={codeRef}
            value={formData.code}
            placeholder="Code"
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Price</FieldLabel>
          <Input
            id="price"
            ref={priceRef}
            type="number"
            placeholder="฿1,000"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />
        </Field>

        <ButtonRow>
          <SecondaryButton to="/product-list">ยกเลิก</SecondaryButton>
          <UploadButton type="submit">ยืนยัน</UploadButton>
        </ButtonRow>
      </Form>
    </Main>
  );
};

export default UploadProduct;
