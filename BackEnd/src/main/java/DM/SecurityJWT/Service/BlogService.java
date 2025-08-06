package DM.SecurityJWT.Service;

import DM.SecurityJWT.Dto.BlogRequestDTO;
import DM.SecurityJWT.Dto.CropGetRespondDTO;
import DM.SecurityJWT.Dto.GetBlogsRespondDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Entity.Blogs;
import DM.SecurityJWT.Entity.Status;
import DM.SecurityJWT.Repository.BlogRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;


    public RespondDTO createNewBlog(BlogRequestDTO blogDto) {
        Blogs blogs=new Blogs();
        blogs.setTitle(blogDto.getTitle());
        blogs.setImgURL(blogDto.getImgURL());
        blogs.setCreatedAt(LocalDateTime.now());
        blogs.setContent(blogDto.getContent());
        blogs.setStatus(Status.ACTIVE);
        blogs.setCreator(blogDto.getCreator());
        blogRepository.save(blogs);
        return new RespondDTO("New Blog created with Id "+blogs.getId(),null);
    }

    public List<GetBlogsRespondDTO> getAllBlogs() {
        return blogRepository.findAll().stream()
                .map(blogs -> new GetBlogsRespondDTO(
                        blogs.getId(),
                        blogs.getTitle(),
                        blogs.getContent(),
                        blogs.getImgURL(),
                        blogs.getCreatedAt(),
                        blogs.getCreator()
                )).collect(Collectors.toList());
    }


    public GetBlogsRespondDTO getSelectBlog(Long id) {
        Optional<Blogs> optionalBlog = blogRepository.findById(id);

        if (optionalBlog.isEmpty()) {
            throw new EntityNotFoundException("Blog with ID " + id + " not found");
        }

        Blogs blog = optionalBlog.get();
        return new GetBlogsRespondDTO(
                blog.getId(),
                blog.getTitle(),
                blog.getContent(),
                blog.getImgURL(),
                blog.getCreatedAt(),
                blog.getCreator()
        );
    }
}
