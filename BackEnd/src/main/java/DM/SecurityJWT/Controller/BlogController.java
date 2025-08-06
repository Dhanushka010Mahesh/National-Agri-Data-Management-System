package DM.SecurityJWT.Controller;


import DM.SecurityJWT.Dto.BlogRequestDTO;
import DM.SecurityJWT.Dto.CropGetRespondDTO;
import DM.SecurityJWT.Dto.GetBlogsRespondDTO;
import DM.SecurityJWT.Dto.RespondDTO;
import DM.SecurityJWT.Service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:8090/")
@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("/new")
    public RespondDTO createNewBlog(@RequestBody BlogRequestDTO blogDto){
        return blogService.createNewBlog(blogDto);
    }
    @GetMapping("/get")
    public ResponseEntity<List<GetBlogsRespondDTO>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/get/{id}")
    public GetBlogsRespondDTO getSelectBlog(@PathVariable Long id) {
        return blogService.getSelectBlog(id);
    }


}