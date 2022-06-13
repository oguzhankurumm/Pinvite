#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "Compressor-Bridging-Header.h"
#import "Compressor.h"
#import "ImageCompressor.h"
#import "ImageCompressorOptions.h"
#import "VideoCompressor.h"

FOUNDATION_EXPORT double react_native_compressorVersionNumber;
FOUNDATION_EXPORT const unsigned char react_native_compressorVersionString[];

