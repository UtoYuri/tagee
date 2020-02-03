package models

import (
	"github.com/jinzhu/gorm"
	"github.com/pkg/errors"
	"tagee/pkg/database"
	"tagee/web/utils"
	"time"
)

const (
	StatusNormal  = 0
	StatusDeleted = 1
)

type Media struct {
	gorm.Model
	Title                  string `gorm:"size:255;not null;"`
	Kind                   int
	Suffix                 string
	Size                   uint64
	Url                    string `gorm:"size:1000;not null;"`
	ThumbnailUrl           string `gorm:"size:1000;not null;"`
	Description            string `gorm:"size:500;"`
	LastModifiedAt         time.Time
	OriginRelativePathname string
	CustomRelativePathname string
	MD5                    string
	Status                 int `gorm:"default:'0'"`
}

type MediaReadonly struct {
	ID                     uint   `form:"id"`
	Title                  string `form:"title"`
	Kind                   int    `form:"kind"`
	Suffix                 string `form:"suffix"`
	Size                   uint64 `form:"size"`
	Url                    string `form:"url"`
	ThumbnailUrl           string `form:"thumbnail_url"`
	Description            string `form:"description"`
	LastModifiedAt         int64  `form:"last_modified_at"`
	OriginRelativePathname string `form:"origin_relative_pathname"`
	CustomRelativePathname string `form:"custom_relative_pathname"`
	MD5                    string `form:"md5"`
	Status                 int    `form:"status"`
	CreatedAt              int64  `form:"created_at"`
	UpdatedAt              int64  `form:"updated_at"`
}

func GetMedia(id uint) (*Media, error) {
	var media Media
	result := database.DB.First(&media, id)

	if media.Status != StatusNormal {
		return nil, errors.New("media forbidden")
	}

	return &media, result.Error
}

func GetMediaBulk() ([]*Media, error) {
	var medias []*Media

	result := database.DB.Where("status = ?", StatusNormal).Find(&medias)

	return medias, result.Error
}

func IsMediaExist(md5 string) (bool, *Media) {
	var media Media

	result := database.DB.Where("md5 = ?", md5).First(&media)
	if result.Error != nil {
		return false, nil
	}

	return true, &media
}

func CreateMedia(media *Media) error {
	media.LastModifiedAt = utils.ValidOrDefault(media.LastModifiedAt, time.Now()).(time.Time)
	media.Status = StatusNormal
	result := database.DB.Create(media)
	return result.Error
}

func (media *Media) Update() error {
	if media.Status != StatusNormal {
		return errors.New("media forbidden")
	}

	result := database.DB.Model(media).Updates(*media)
	return result.Error
}

func (media *Media) Delete() error {
	if media.Status != StatusNormal {
		return nil
	}

	media.Status = StatusDeleted
	result := database.DB.Model(media).Updates(*media)
	return result.Error
}

func (media *Media) Plain() MediaReadonly {
	return MediaReadonly{
		ID:                     media.ID,
		Title:                  media.Title,
		Kind:                   media.Kind,
		Suffix:                 media.Suffix,
		Size:                   media.Size,
		Url:                    media.Url,
		ThumbnailUrl:           media.ThumbnailUrl,
		Description:            media.Description,
		LastModifiedAt:         media.LastModifiedAt.Unix(),
		OriginRelativePathname: media.OriginRelativePathname,
		CustomRelativePathname: media.CustomRelativePathname,
		MD5:                    media.MD5,
		Status:                 media.Status,
		CreatedAt:              media.CreatedAt.Unix(),
		UpdatedAt:              media.UpdatedAt.Unix(),
	}
}

func PlainBulk(medias []*Media) []MediaReadonly {
	mediasReadonly := make([]MediaReadonly, 0)

	for _, media := range medias {
		mediasReadonly = append(mediasReadonly, MediaReadonly{
			ID:                     media.ID,
			Title:                  media.Title,
			Kind:                   media.Kind,
			Suffix:                 media.Suffix,
			Size:                   media.Size,
			Url:                    media.Url,
			ThumbnailUrl:           media.ThumbnailUrl,
			Description:            media.Description,
			LastModifiedAt:         media.LastModifiedAt.Unix(),
			OriginRelativePathname: media.OriginRelativePathname,
			CustomRelativePathname: media.CustomRelativePathname,
			MD5:                    media.MD5,
			Status:                 media.Status,
			CreatedAt:              media.CreatedAt.Unix(),
			UpdatedAt:              media.UpdatedAt.Unix(),
		})
	}

	return mediasReadonly
}
