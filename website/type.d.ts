type MediaType = 'image' | 'video' | 'audio';

interface Media {
	ID: string;
	Title: string;
	Kind: number;
	Suffix: string;
	Size: number;
	Url: string;
	ThumbnailUrl: string;
	Description: string;
	LastModifiedAt: number;
	OriginRelativePathname: string;
	CustomRelativePathname: string;
  MD5: string;
	Status: number;
	CreatedAt: number;
	UpdatedAt: number;
}